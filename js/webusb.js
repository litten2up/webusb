let device
function connect(){
    navigator.usb.requestDevice({ filters: [{  }] })
    .then(device => {
        console.log(device.productName);      // "Arduino Micro"
        console.log(device.manufacturerName); // "Arduino LLC"
    })
    .catch(error => { console.error(error); });
    navigator.usb.getDevices().then(devices => {
        devices.forEach(device => {
          console.log(device.productName);      // "Arduino Micro"
          console.log(device.manufacturerName); // "Arduino LLC"
        });
    })
    device.open();
}
// Get all serial ports the user has previously granted the website access to.
const ports = await navigator.serial.getPorts();
// Prompt user to select any serial port.
const port = await navigator.serial.requestPort();

// Wait for the serial port to open.
await port.open({ baudRate: 9600 });
const textDecoder = new TextDecoderStream();
const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
const reader = textDecoder.readable.getReader();

// Listen to data coming from the serial device.
while (true) {
  const { value, done } = await reader.read();
  if (done) {
    // Allow the serial port to be closed later.
    reader.releaseLock();
    break;
  }
  // value is a string.
  console.log(value);
}
write=false;
const writer = port.writable.getWriter();

const data = new Uint8Array([104, 101, 108, 108, 111]); // hello
if (write){
    await writer.write(data);
    write=false;
}

// Allow the serial port to be closed later.
writer.releaseLock();
function hello(){
    write=true;
}