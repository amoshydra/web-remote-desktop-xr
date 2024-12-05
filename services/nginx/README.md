# Nginx Forward Proxy

`nginx` service used to provide TLS environment for the various endpoint used in this application.

On first start, it depends on `services/task-create-cert` to create a self-signed TLS certification inside `services/nginx/certs`.

You may use this to get WebXR and WebSocket inside a secure context (HTTPS).

## Note

`services/task-create-cert` generated a self-signed TLS certification that will cause browser to show warning.

You may replace `services/nginx/certs/server.crt` and `services/nginx/certs/server.key` with your own. 
