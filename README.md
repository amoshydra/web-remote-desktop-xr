# Web Remote Desktop XR

A proof of concept for a WebXR remote desktop environment utilizing WebRTC (with WHIP) and WebSockets.

![Web Remote Desktop XR](./documents/header.jpg)


## Getting started

This project is primarily created to provide a VR remote desktop environment for Linux environment.

It requires:
- NodeJS
- Docker / podman-compose
- Open Broadcaster Software (OBS)

### Frontend client

```bash 
npm run dev -- --host 
```

### OvenMediaEngine

```bash
docker compose up -d
```

We use [OvenMediaEngine](https://airensoft.gitbook.io/ovenmediaengine/live-source/webrtc)'s WHIP (WebRTC-HTTP Ingestion Protocol) for WebRTC ingest.

This will expose the following endpoints:

- Clear - http://127.0.0.1:3333/app/stream?direction=whip
- TLS - https://local-dev-domain.localhost:3334/app/stream?direction=whip

See: [OvenMediaEngine >Configuration > TLS Encryption](https://airensoft.gitbook.io/ovenmediaengine/configuration/tls-encryption)

### Broadcasting

This guide uses OBS to capture the Desktop environment and stream it to the WHIP WebRTC ingest endpoint.

#### Dependencies:

- OBS v30 or above
  - [WebRTC (WHIP) output support](https://github.com/obsproject/obs-studio/pull/7926#event-10054225384) (>= v30)
  - [obs-websocket](https://github.com/obsproject/obs-websocket) (>= v28)

#### Sources

You can configure any source you want here.

For remote desktop experience:
1. Configure a Screen Capture source.
2. Select the source, right click and choose: "Resize output (source size)"

Output size is currently limited to 4096x4096 due to the usage of H264 encoder. AV1 and H265 is likely unsupported when used with OvenMediaEngine WebRTC ingest.

#### Broadcast settings

> Reference:
> - [OvenMediaEngine > Quick Start > publishing](https://airensoft.gitbook.io/ovenmediaengine/quick-start#publishing)
> - [OvenMediaEngine > Live Source > WebRTC > WHIP URL](https://airensoft.gitbook.io/ovenmediaengine/live-source/webrtc#whip-url)

Open `Settings` > `Stream`:
- Select service: WHIP
- Server: http://127.0.0.1:3333/app/stream?direction=whip
- Bearer Token: leave blank

![OBS stream settings](documents/obs-settings-stream.png)

Configure your audio / video and video encoding as followed:

![OBS output settings](documents/obs-settings-output.png)

The following encoder are tested working on Arch Linux on Wayland with a NVIDIA RTX graphic card:
- x264 (CPU)
- NVIDIA NVENC H.264 (GPU)

#### CPU Encoding
Sample encoder settings
- Video Encoder: x264
- Encoder Settings:
  - Keyframe Interval: 1s
  - CPU Usage Preset: ultrafast
  - Profile: baseline / high
  - Tune: zerolatency

#### GPU Encoding

Sample encoder settings for NVIDIA graphic card
- Video Encoder: NVIDIA NVENC H.264
- Encoder Settings:
  - Keyframe Interval: 1s
  - Preset: P1: Fastest (Lowest Quality)
  - Tuning: Ultra Low Latency
  - Profile: baseline / high

### Start Streaming

1. Confirm / Apply the settings,
2. "Start Streaming"

## Usage

### Standalone Headset

#### ⚠️ Note - Secure Context (HTTPS)

Usage of [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) outside of localhost requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).  
If you are loading this onto a standalone headset such as Oculus Quest, you will to:
- Option 1: provision SSL certs for the NodeJS frontend client and for the OvenMediaEngine
- Option 2: provide a local DNS server that resolve your application IP address to a `*.localhost` URL.

##### Option 1:
Assuming SSL is configured for the following endpoints:
- Frontend - `https://frontend.dev.localhost`
- OvenMediaEngine - `wss://ome.dev.localhost:3334/app/stream`

On your standalone headset, open a WebXR capable web browser and go to:  
https://frontend.dev.localhost?file=wss://ome.dev.localhost:3334/app/stream

##### Option 2:
Without SSL, assuming your DNS record is configured for the following endpoints:

- Frontend - `http://wrdxr.dev.localhost`
- OvenMediaEngine - `ws://wrdxr.dev.localhost:3333/app/stream`

On your standalone headset, open a WebXR capable web browser and go to:  
http://wrdxr.localhost?file=ws://wrdxr.localhost:3333/app/stream

You should see your broadcasted source on the video player.

Click "Open VR" to enter VR mode.

[See video preview](https://github.com/user-attachments/assets/6268ff89-c110-4342-bff3-b1fc075d6927)

### PC VR

Using a WebXR capable browser, browse to:
- http://127.0.0.1:5173?file=ws://127.0.0.1:3333/app/stream

You should see your broadcasted source on the video player.

Click "Open VR" to enter VR mode.

