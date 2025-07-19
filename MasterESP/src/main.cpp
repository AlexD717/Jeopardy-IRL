#include <WiFi.h>
#include <esp_now.h>

// MAC address of the master CC:7B:5C:F6:58:14

// Replace with MAC addresses of your followers
// CC:7B:5C:FC:C0:38
uint8_t followerMACs[][6] = {
  {0xCC, 0x7B, 0x5C, 0xFC, 0xC0, 0x38},
  {0x24, 0x6F, 0x28, 0xAA, 0xBB, 0x01},
  {0x24, 0x6F, 0x28, 0xAA, 0xBB, 0x02}
};

const int numFollowers = sizeof(followerMACs) / sizeof(followerMACs[0]);

const int version = 1;

typedef struct Message {
  char text[32];
} Message;

void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
  char macStr[18];
  snprintf(macStr, sizeof(macStr), "%02X:%02X:%02X:%02X:%02X:%02X",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

  Serial.print("Received message from ");
  Serial.println(macStr);

  Message msg;
  memcpy(&msg, incomingData, sizeof(msg));
  Serial.print("Message: ");
  Serial.println(msg.text);
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

  for (int i = 0; i < numFollowers; i++) {
    esp_now_peer_info_t peerInfo = {};
    memcpy(peerInfo.peer_addr, followerMACs[i], 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;

    if (esp_now_add_peer(&peerInfo) != ESP_OK) {
      Serial.print("Failed to add follower ");
      Serial.println(i);
    }
  }

  delay(1000);

  // Wait for connection to serial (web app)
  while(!Serial) {
    delay(100);
  }
  Serial.println("MasterESP Connected " + String(version));
}

void loop() {
  Message msg;
  strcpy(msg.text, "Hello followers!");

  for (int i = 0; i < numFollowers; i++) {
    esp_err_t result = esp_now_send(followerMACs[i], (uint8_t *)&msg, sizeof(msg));
    if (result == ESP_OK) {
      Serial.print("Sent to follower ");
      Serial.println(i);
    } else {
      Serial.print("Failed to send to follower ");
      Serial.println(i);
    }
  }

  delay(5000);
}
