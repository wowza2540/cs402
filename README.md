#suk25 : คอร์สเรียนออนไลน์ 
โปรเจคจบวิชา CS402 และ CS401
จัดทำโดย
นางสาวคุนัญญา แซ่โก รหัสนักศึกษา 5909610700
นางสาวสุภาพร ทองศักดิ์ รหัสนักศึกษา 5909610759

**Directory Tree**
-----------------------


**How to start**
----------------------

**on localhost**

 1. ติดตั้ง Node.js จากเว็บไซต์ [https://nodejs.org/en/](https://nodejs.org/en/)**
 2. ติดตั้ง Typescript โดยใช้คำสั่ง `npm install -g typescript`
 3. ติดตั้ง Angular cli โดยใช้คำสั่ง `npm install -g @angular/cli`  
 4. เพิ่ม database table  ชื่อ online_learningใน phpmyadmin

***on server***

 1. คัดลอกไฟล์ใน .dist ในโปรเจค ลงใน /var/www/html/firstApp
 2. สร้างไฟล์ /uploads ใน /var/www/html
 
 **ติดตั้ง nimble streamer**
 
ก่อนจะเริ่มใช้งานในส่วนการสตรีมวิดีโอ ให้ทำการติดตั้ง nimble streamer ตามขั้นตอนต่อไปนี้

 1. ทำการแก้ไขไฟล์  `sudo nano /etc/apt/sources.list`
 2. วางคำสั่งต่อไปนี้ในไฟล์ sources.list  `deb http://nimblestreamer.com/ubuntu bionic/`
 3. กด  `ctrl+o` หลังจากนั้นกด enter เพื่อทำการบันทึกไฟล์  `ctrl+x` เพื่อออกจากการแก้ไขไฟล์
 4. พิมพ์คำสั่งต่อไปนี้ 
 

		> $ wget -q -O - http://nimblestreamer.com/gpg.key | sudo apt-key add –
		> $ sudo apt-get update
		> $ sudo apt-get install nimble
		> $ sudo /usr/bin/nimble_regutil
		> $ sudo service nimble restart

** หากต้องการ stop service ให้ใช้คำสั่ง `sudo service nimble stop`



**การตั้งค่า nimble streamer บนเว็บไซต์**

 1. ทำการลงทะเบียนอีเมลล์ที่เว็บไซต์ **[https://wmspanel.com/](https://wmspanel.com/)**
 2. ทำตามขั้นตอนต่อไปนี้
	 nimble streamer -> edit nimble routes -> Add VOD Streaming route
4. กรอกรายละเอียดดังต่อไปนี้
	- domain : เว้นว่างเอาไว้เพื่อให้domain ไหนก็ได้สามารถเข้าถึง stream
	-	Path1 : พาร์ทที่จะใส่ใน url
	-	Path2 : ที่อยู่ของไฟล์ในโฟลเดอร์ที่เราเลือก
	-	Server : เลือกเซิร์ฟเวอร์ที่กำลังทำงานอยู่หรือมีสถานะ running
