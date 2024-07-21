// 투두 등록하기
// 1. input의 입력값을 받아온다.
// 2. 버튼을 가져와서 클릭 이벤트를 만들어준다
// 3. 클릭하면 인풋의 값을 저장한다
// 4. 저장된 인풋값을 화면에 보여준다
// 5. 화면에 보여줄때 삭제 버튼도 함께 생성된다

const $input = document.querySelector("input");
const $addBtn = document.querySelector(".addBtn");
const $delBtn = document.querySelector(".delBtn");
const $ul = document.querySelector("ul");
// const $mokdata = document.querySelector(".mokdata");
const $li = document.querySelectorAll("li");

$addBtn.addEventListener("click", function () {
  let value = $input.value;
  let newList = document.createElement("li");
  let newDelBtn = document.createElement("button");

  newDelBtn.className = "delBtn";
  newDelBtn.innerText = "삭제";

  let countLi = document.querySelectorAll("li");
  $ul.appendChild(newList);
  newList.appendChild(
    document.createTextNode(`${countLi.length + 1}. ${value} `)
  );
  newList.appendChild(newDelBtn);
});

// 리스트 앞에 번호 붙이기
// 1. li의 length를 가져온다.
// 2. 새로 생성될때 전체 length에 +1을 해준다
