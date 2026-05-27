#!/bin/bash
# setup-garage.sh
echo "Levantando Garage..."
docker-compose up -d

echo "Esperando que Garage inicie..."
sleep 5

echo "Obteniendo Node ID..."
NODE_ID=$(docker exec garage_storage /garage node id 2>/dev/null | tail -1 | cut -d'@' -f1)
echo "Node ID: $NODE_ID"

echo "Asignando layout..."
docker exec garage_storage /garage layout assign -z default -c 10G $NODE_ID
docker exec garage_storage /garage layout apply --version 1

echo "Creando buckets..."
docker exec garage_storage /garage bucket create documentos-ss
docker exec garage_storage /garage bucket create documentos-rp

echo "Creando credenciales..."
docker exec garage_storage /garage key create nestjs-api-key

echo "IMPORTANTE: Copia el Key ID y Secret key de arriba y pégalos en tu .env"