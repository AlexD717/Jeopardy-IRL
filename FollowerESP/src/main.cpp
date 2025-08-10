#include <WiFi.h>
#include <esp_now.h>

const int version = 1;
const int buttonPin = 32; // TODO change to your button pin
bool lastButtonState = HIGH;

typedef struct Message {
  char text[32];
} Message;

// MAC address of the master FC:B4:67:F2:AB:E0
uint8_t masterMAC[] = {0xFC, 0xB4, 0x67, 0xF2, 0xAB, 0xE0}; // TODO change to your master MAC address

void OnDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
  Message msg;
  memcpy(&msg, incomingData, sizeof(msg));

  Serial.print("Received from master: ");
  Serial.println(msg.text);

  String searchStr = "Searching for followers " + String(version);
  if (strstr(msg.text, searchStr.c_str())) {
    Message response;
    String acknowledgeStr = "Ready " + String(WiFi.macAddress());
    strncpy(response.text, acknowledgeStr.c_str(), sizeof(response.text) - 1);
    response.text[sizeof(response.text) - 1] = '\0';  // Ensure null termination
    esp_now_send(mac, (uint8_t *)&response, sizeof(response));
  }
}

void setup() {
  Serial.begin(9600);

  // Pin setup
  pinMode(buttonPin, INPUT_PULLUP);

  // ESP-NOW setup
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

  Serial.println("Follower setup complete, waiting for messages...");
}

void loop() {
  int currentButtonState = digitalRead(buttonPin);
  if (currentButtonState == LOW && lastButtonState == HIGH) {
    Serial.println("Button pressed, sending message to master...");
    Message msg;
    String acknowledgeStr = "Button Press " + String(WiFi.macAddress());
    strncpy(msg.text, acknowledgeStr.c_str(), sizeof(msg.text) - 1);
    msg.text[sizeof(msg.text) - 1] = '\0';
    esp_now_send(masterMAC, (uint8_t *)&msg, sizeof(msg));
  }
  lastButtonState = currentButtonState;
  delay(10);
}
