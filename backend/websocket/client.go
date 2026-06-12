package websocket

import (
	"strings"
	"time"

	gorilla "github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 4096
)

type Client struct {
	Hub    *Hub
	Conn   *gorilla.Conn
	UserID int64
	Name   string
	Email  string
	send   chan Message
}

type incomingMessage struct {
	Content string `json:"content"`
}

func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister(c)
		c.Conn.Close()
	}()

	c.Conn.SetReadLimit(maxMessageSize)
	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error {
		c.Conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		var incoming incomingMessage
		if err := c.Conn.ReadJSON(&incoming); err != nil {
			break
		}

		content := strings.TrimSpace(incoming.Content)
		if content == "" {
			continue
		}

		c.Hub.Broadcast(Message{
			Type:      "message",
			User:      c.Name,
			Email:     c.Email,
			Content:   content,
			Timestamp: time.Now().UTC().Format(time.RFC3339),
		})
	}
}

func (c *Client) WritePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.Conn.WriteMessage(gorilla.CloseMessage, []byte{})
				return
			}

			if err := c.Conn.WriteJSON(message); err != nil {
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.Conn.WriteMessage(gorilla.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
