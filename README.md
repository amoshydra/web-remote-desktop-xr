# Web Remote Desktop XR

A proof of concept for a Web base local remote desktop environment for XR environment using WebRTC with WHIP.

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
- TLS - https://tls.domain.local:3334/app/stream?direction=whip (see [TLS configuration](#tls-configuration))


### Broadcasting

This guide uses OBS to capture the Desktop environment and stream it to the WHIP WebRTC ingest endpoint.

#### Sources

1. Configure a Screen Capture source.
2. Select the source, right click and choose: "Resize output (source size)"

#### Broadcast settings

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

> **⚠️ Note - SSL required**  
> Usage of WebXR and WebRTC outside of localhost requires SSL environment.  
> If you are loading this onto a standalone headset such as Oculus Quest,
> you will need to provision SSL certs for the NodeJS frontend client and for the OvenMediaEngine.

Assuming SSL is configured the following endpoints:
- Frontend - https://frontend.dev.localhost
- OvenMediaEngine - wss://ome.dev.localhost:3334/app/stream

On your standalone headset, open a XR capable Web Browser and go to:  
https://frontend.dev.localhost?file=wss://ome.dev.localhost:3334/app/stream

You should see your broadcasted source on the video player.

Click "Open VR" to enter VR mode.

### PC VR

Using a WebXR capable browser, browse to:
- http://127.0.0.1:5173?file=ws://127.0.0.1:3333/app/stream

You should see your broadcasted source on the video player.

Click "Open VR" to enter VR mode.

