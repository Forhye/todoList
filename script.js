// 투두 등록하기
// 1. input의 입력값을 받아온다.
// 2. 버튼을 가져와서 클릭 이벤트를 만들어준다
// 3. 클릭하면 인풋의 값을 저장한다
// 4. 저장된 인풋값을 화면에 보여준다
// 5. 화면에 보여줄때 삭제 버튼도 함께 생성된다

const $input = document.querySelector("input");
const $addBtn = document.querySelector(".addBtn");
const $ul = document.querySelector("ul");
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

  $input.value = "";
});

$ul.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    confirm("정말 삭제하시겠습니까?")
      ? (e.target.parentNode.remove(), alert("삭제되었습니다."))
      : alert("취소되었습니다.");
  }
});

const $listWrap = document.querySelector(".listWrap");
$ul.classList.add("dataTodo");

$listWrap.appendChild($ul);

const todoUrl = "http://localhost:3000/todos";

async function getData() {
  try {
    const res = await fetch(todoUrl);
    const resData = await res.json();

    resData.forEach((item) => {
      const $li = document.createElement("li");

      $ul.appendChild($li);
      $li.innerHTML = `<li>${item.id}. ${item.todo}</li>`;
    });
  } catch (err) {
    console.error("오류발생");
  }
}
getData();

// 삭제 버튼을 눌렀을 때 삭제가 되면
// 삭제된 요소 아래의 li 리스트 번호를 원래 번호에서 -1로 바꾼다
// length의 길이에서 -1을 하면 성립될 수 없으니까
// 번호만 불러와서 제어할 수 있는 html 태그를 만들어줘야된다
// 번호를 불러와서 -1을 해준다
// 그러고 html에 다시 그려준다
