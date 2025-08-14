# Jeopardy IRL

A custom Jeopardy website that also integrates with physical buttons. You connect one esp through serial to the device running the website, and the rest of the buttons connect to that esp through the ESP NOW protocol, allowing for wireless communication. This enables the Jeopardy website to know which button was pressed first, and give/subtract points from that team.

## Setup

### Required Materials

You need at least 3 esps to be able to use this. One ESP will act as the MasterESP, and be plugged into the device running the website. The other two will be FollowerESPs and be inside each button.
You also need a device running the web app on Chrome or a different browser that supports the web serial API (many don't support it (https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility))

### Setting up the ESPs

If you don't already have the esp drivers, make sure to go in and install them. [Sample Tutorial](https://randomnerdtutorials.com/install-esp32-esp8266-usb-drivers-cp210x-windows/)

The first step is to identify the Mac Address of each ESP. To do this run the script in the MacAddressESP folder, and observe the serial output. You should get something like CA:7B:FC:F6:72:29.
Choose one ESP to be the MasterESP and update the FollowerESP script to have the MasterESP Mac Address (Line 13, TODO statement). Then update the MasterESP code to have the Mac Addresses of all other ESPs (Line 15, TODO statement).

Then connect any button that you want, to the GND pin and 32 pin (can be changed on line 5 in FollowerESP) on each FollowerESP.

The last step is to plug in the MasterESP with a cable that supports data transfer (some don't), and connect each FollowerESP to power (either through the usb port or the pins)

### Running the app

Navigate to https://alexd717.github.io/Jeopardy-IRL/, and press the Connect MasterESP button, select the port of the MasterESP and the app will guide you through the rest of the process.
At a certain points a second tab will automatically open. This is the Game tab, and clicking anything on there will do nothing. To select the questions that will appear, make sure to click on the GameHost tab (will have a For Host Eyes Only message at the bottom).

## Demo

[![Demo](assets/demo-thumbnail.png)](assets/demo.mp4)
