package main

import (
	"log"

	"advanced-go-realtime-backend-platform/config"
	"advanced-go-realtime-backend-platform/routes"
	ws "advanced-go-realtime-backend-platform/websocket"
)

func main() {
	cfg := config.Load()
	if err := config.Validate(cfg); err != nil {
		log.Fatalf("configuration error: %v", err)
	}

	db, err := config.OpenDatabase(cfg.DatabasePath)
	if err != nil {
		log.Fatalf("database error: %v", err)
	}
	defer db.Close()

	hub := ws.NewHub()
	go hub.Run()

	router := routes.Setup(cfg, db, hub)

	log.Printf("backend listening on :%s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
