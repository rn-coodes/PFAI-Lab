package websocket

import (
	"sync/atomic"
	"time"
)

type Message struct {
	Type      string   `json:"type"`
	User      string   `json:"user,omitempty"`
	Email     string   `json:"email,omitempty"`
	Content   string   `json:"content,omitempty"`
	Timestamp string   `json:"timestamp"`
	Online    []string `json:"online,omitempty"`
}

type Hub struct {
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan Message
	active     atomic.Int64
	delivered  atomic.Uint64
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan Message, 32),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			h.active.Add(1)
			h.broadcastOnlineUsers()
			h.broadcast <- Message{
				Type:      "system",
				Content:   client.Name + " joined the chat",
				Timestamp: time.Now().UTC().Format(time.RFC3339),
			}
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				h.active.Add(-1)
				close(client.send)
				h.broadcastOnlineUsers()
				h.broadcast <- Message{
					Type:      "system",
					Content:   client.Name + " left the chat",
					Timestamp: time.Now().UTC().Format(time.RFC3339),
				}
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
					h.delivered.Add(1)
				default:
					delete(h.clients, client)
					h.active.Add(-1)
					close(client.send)
				}
			}
		}
	}
}

func (h *Hub) Stats() (active int64, delivered uint64) {
	return h.active.Load(), h.delivered.Load()
}

func (h *Hub) Register(client *Client) {
	h.register <- client
}

func (h *Hub) Unregister(client *Client) {
	h.unregister <- client
}

func (h *Hub) Broadcast(message Message) {
	h.broadcast <- message
}

func (h *Hub) broadcastOnlineUsers() {
	online := make([]string, 0, len(h.clients))
	for client := range h.clients {
		online = append(online, client.Name)
	}

	h.broadcast <- Message{
		Type:      "presence",
		Online:    online,
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	}
}
