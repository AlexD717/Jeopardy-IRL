#include <WiFi.h>

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);  // Ensure it's in station mode
  Serial.println("ESP32 MAC Address: ");
  Serial.println(WiFi.macAddress());
}

void loop() {
  // nothing
}
