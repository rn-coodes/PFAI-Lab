package config

import "testing"

func TestValidateRejectsDefaultSecretInProduction(t *testing.T) {
	cfg := Config{
		Env:            "production",
		JWTSecret:      "change-me-in-production",
		AllowedOrigins: []string{"https://example.com"},
	}

	if err := Validate(cfg); err == nil {
		t.Fatal("expected production default secret to be rejected")
	}
}

func TestValidateAcceptsConfiguredProduction(t *testing.T) {
	cfg := Config{
		Env:            "production",
		JWTSecret:      "a-long-production-secret",
		AllowedOrigins: []string{"https://example.com"},
	}

	if err := Validate(cfg); err != nil {
		t.Fatalf("expected valid production config, got %v", err)
	}
}
