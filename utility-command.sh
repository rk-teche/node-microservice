sudo docker build -t rkteche/post-service:latest .
docker push rkteche/post-service

sudo docker build -t rkteche/event-bus:latest .
docker push rkteche/event-bus

kubectl apply -f posts-srv.yaml
kubectl apply -f posts-depl.yaml
kubectl apply -f event-bus-depl.yaml

kubectl rollout restart deployment posts-depl
kubectl rollout restart deployment event-bus-depl