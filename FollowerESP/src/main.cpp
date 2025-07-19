#include <WiFi.h>
#include <esp_now.h>

typedef struct Message {
  char text[32];
} Message;

// MAC address of the master CC:7B:5C:F6:58:14
uint8_t masterMAC[] = {0xCC, 0x7B, 0x5C, 0xF6, 0x58, 0x14};

void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
  Message msg;
  memcpy(&msg, incomingData, sizeof(msg));

  Serial.print("Received from master: ");
  Serial.println(msg.text);

  // Respond
  Message response;
  strcpy(response.text, "Acknowledge from follower");
  esp_now_send(mac, (uint8_t *)&response, sizeof(response));
}

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW init failed!");
    return;
  }

  esp_now_register_recv_cb(OnDataRecv);

  esp_now_peer_info_t peerInfo = {};
  memcpy(peerInfo.peer_addr, masterMAC, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;

  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Failed to add master peer");
  }
}

void loop() {
  delay(1000); // Idle, all work done in callback
}
