const inputTitleDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const threadSectionDom = document.getElementById("threadSction");
const formDom = document.getElementById("formSection");

//スレッドの取得
const getAllThreads = async() => {
	try{
		let allThreads = await axios.get('/api/v1/threads');
		//let { data } = allThreads;
		//出力
		allThreads = Object.assign(allThreads.data).map((thread) => {
			const { title, content } = thread;
			return `
				<div class="single-thread">
					<h3>${ title }</h3>
					<p>${ content }</p>
				</div>
			`;
		}).join("");
		threadSectionDom.innerHTML = allThreads;

	} catch(error){
		console.log(error);
	}
}
getAllThreads();

//スレッドの投稿(送信)
formDom.addEventListener('submit', async (e) => {
	e.preventDefault();
	const textTitle = inputTitleDOM.value;
	const textContent = inputContentDOM.value;

	if(textTitle && textContent){
		console.log("success");
		console.log(textTitle, textContent);
		try{
			await axios.post("/api/v1/thread", {
				title: textTitle,
				content: textContent,
			});
			getAllThreads();
		} catch(error){
			console.log(error);
		}
		inputTitleDOM.value = "";
    inputContentDOM.value = "";

  } else {
    console.log("error");
  }
});