sudo docker build -t rkteche/post-service:latest .
docker push rkteche/post-service

sudo docker build -t rkteche/event-bus:latest .
docker push rkteche/event-bus

sudo docker build -t rkteche/comment-service:latest .
docker push rkteche/comment-service

sudo docker build -t rkteche/query-service:latest .
docker push rkteche/query-service

sudo docker build -t rkteche/moderation-service:latest .
docker push rkteche/moderation-service

kubectl apply -f posts-srv.yaml
kubectl apply -f posts-depl.yaml
kubectl apply -f event-bus-depl.yaml

kubectl apply -f comments-depl.yaml
kubectl apply -f query-depl.yaml
kubectl apply -f moderation-depl.yaml

kubectl rollout restart deployment posts-depl
kubectl rollout restart deployment event-bus-depl

kubectl rollout restart deployment comments-depl
kubectl rollout restart deployment query-depl
kubectl rollout restart deployment moderation-depl