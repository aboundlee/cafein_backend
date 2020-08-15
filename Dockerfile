FROM node:carbon
 
#app 폴더 만들기 - NodeJS 어플리케이션 폴더
RUN mkdir -p /app
#winston 등을 사용할떄엔 log 폴더도 생성
 
#어플리케이션 폴더를 Workdir로 지정 - 서버가동용
WORKDIR /app
 
#서버 파일 복사 ADD [어플리케이션파일 위치] [컨테이너내부의 어플리케이션 파일위치]
ADD ./ /app
 
# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

#패키지파일들 받기
RUN npm install
 
#배포버젼으로 설정 - 이 설정으로 환경을 나눌 수 있습니다.
ENV NODE_ENV=production
 
# 앱 소스 추가
COPY . .

EXPOSE 3000 
CMD node server.js

