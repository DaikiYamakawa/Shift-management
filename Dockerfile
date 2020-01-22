# ベースイメージを指定
# 今回は LTS の 10.16.3 にする
# alpine は 軽量の linux OS
FROM node:10.16.3-alpine

#-gでパスを通す
RUN npm install -g create-react-app

WORKDIR /home/workdir

RUN create-react-app app

#簡易サーバを立てる用(フロント開発に使用)
RUN npm install -g http-server