//Node.js - File System 모듈 호출
 
$.ajax({
	url: "/getdata20",
	type: "POST",
    async: false,

	success: function(cafe_data){
		if (cafe_data){
        

			console.log("success!");
			writeMarkers(cafe_data);
		} else{
			alert("fail to get cafe data");
		}
	}
});



function writeMarkers(cafe_data){
    console.log(cafe_data);

		console.log(cafe_data[1]);

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
		mapOption = { 
			center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


	function getUserLatLng(){
        console.log(navigator.geolocation);
		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function(position) {
				console.log("3!!!");

				var lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도

				var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

				message = "FF";
				console.log("set map to your loation!");
				// 마커와 인포윈도우를 표시합니다
				displayMarker(locPosition, message);
				

			  });

		} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

			console.log("4!!!");
			var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
				message = 'geolocation을 사용할수 없어요..'

			console.log(message);
			displayMarker(locPosition, message);
		}
	}

	function getCenterLatLng(){
		var position = map.getCenter();
		message = "Center Position";
		displayMarker(locPosition, message);
	}


	if (1){
		getUserLatLng();
	} else if (0) {
		targetPos = getCenterLatLng();
		console.log(targetPos);
	}

	// 지도에 마커와 인포윈도우를 표시하는 함수입니다
	function displayMarker(locPosition, message) {

		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
			map: map,
			position: locPosition
		});

		var iwContent = message, // 인포윈도우에 표시할 내용
			iwRemoveable = true;

		// 인포윈도우를 생성합니다
		var infowindow = new kakao.maps.InfoWindow({
			content : iwContent,
			removable : iwRemoveable
		});

		// 인포윈도우를 마커위에 표시합니다
		infowindow.open(map, marker);

		// 지도 중심좌표를 접속위치로 변경합니다
		map.setCenter(locPosition);
	}


	// 마커 이미지의 이미지 주소입니다
	var red_marker_src = "https://raw.githubusercontent.com/nero96in/coronamap_deploy/master/main/static/main/image/red/pharmacy-marker.png"; // Busy : 80-100%
	var orange_marker_src = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png" ; // Busy : 60-79%
	var yellow_marker_src = "https://raw.githubusercontent.com/nero96in/coronamap_deploy/master/main/static/main/image/yellow/pharmacy-marker.png" ; // Busy :  40-59%
	var green_marker_src = "https://raw.githubusercontent.com/nero96in/coronamap_deploy/master/main/static/main/image/green/pharmacy-marker.png" ; // Busy : 0-39%
	var grey_marker_src = "https://raw.githubusercontent.com/nero96in/coronamap_deploy/master/main/static/main/image/gray/pharmacy-marker.png"; // Busy : not_opened
	
	var d = new Date();
    var day_of_week = d.getDay(); // sunday : 0, mon : 1, ... 
    var cur_hour = d.getHours();



	for (var i = 0; i < cafe_data.length; i ++) {
		// 마커 이미지의 이미지 크기 입니다
		var imageSize = new kakao.maps.Size(27, 28); 
		// 마커 이미지를 생성합니다    
		
		const regex = /[\[\]]/;
		var arr = cafe_data[i].busy.split(regex);
		var filtered = arr.filter(function (el) {
		  return el != "" && el != ", ";
		});
		
			

		let cur_busy = filtered[day_of_week].split(', ')[cur_hour];


		
		if (cur_busy >= 80) {
		// red (Busy : 80-100) 
			var level4_markerImage = new kakao.maps.MarkerImage(red_marker_src, imageSize);
			markerImage = level4_markerImage;

		} else if (cur_busy >= 60) {
		// orange (Busy : 60-79) 
			var level3_markerImage = new kakao.maps.MarkerImage(yellow_marker_src, imageSize); 
			markerImage = level3_markerImage;
		} else if (cur_busy >= 40) {
		// yellow (Busy : 40-59) 
			var level2_markerImage = new kakao.maps.MarkerImage(yellow_marker_src, imageSize);
			markerImage = level2_markerImage;
		} else if (cur_busy >= 0) {
		// green (Busy : 0-39) 
			var level1_markerImage = new kakao.maps.MarkerImage(green_marker_src, imageSize);
			markerImage = level1_markerImage;
		} else if (cur_busy == -1) {
		// grey (Busy : not_opened) 
			var level0_markerImage = new kakao.maps.MarkerImage(grey_marker_src, imageSize); 
			markerImage = level0_markerImage;
		} else {
		//예외처리
			console.log("it is wrong busy data");
		}

		// 마커를 생성합니다
		var marker = new kakao.maps.Marker({
			map: map, // 마커를 표시할 지도
			position: new kakao.maps.LatLng(cafe_data[i].lat, cafe_data[i].lon), // 마커를 표시할 위치
			title : cafe_data[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			image : markerImage// 마커 이미지
		});



		// 마커에 표시할 인포윈도우를 생성합니다
		var infowindow = new kakao.maps.InfoWindow({
			content: cafe_data[i].name// 인포윈도우에 표시할 내용
		});

		// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
		// 이벤트 리스너로는 클로저를 만들어 등록합니다
		// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
		kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
		kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
	}




	// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
	function makeOverListener(map, marker, infowindow) {
		return function() {
			infowindow.open(map, marker);
		};
	}

	// 인포윈도우를 닫는 클로저를 만드는 함수입니다
	function makeOutListener(infowindow) {
		return function() {
			infowindow.close();
		};
	}


}



