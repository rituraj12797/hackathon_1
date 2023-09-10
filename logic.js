
// upto this geeraets text 
var input = document.querySelector('.input');
var output = document.querySelector('.output');
var generate = document.querySelector('.generate');

var loader = document.querySelector('.loader');
var textholder = document.querySelector('.textholder');

var select_expand = document.querySelector('.content');
var select_summary = document.querySelector('.Summarizer');
var url_shortener = document.querySelector('.url_shortner');
var rephraser = document.querySelector('.rephraser');
var plag = document.querySelector('.plag')








// to remove crrnt button from all other buttons the current button 

function remove_effect(event){
    select_expand.classList.remove('crrnt_button');
    select_summary.classList.remove('crrnt_button');
    url_shortener.classList.remove('crrnt_button');
    rephraser.classList.remove('crrnt_button');
   
    plag.classList.remove('crrnt_button');

}
var button_arr = [select_expand,select_summary,url_shortener,rephraser,plag]
select_expand.addEventListener('click',()=>{
    remove_effect();
    select_expand.classList.add('crrnt_button');
})
select_summary.addEventListener('click',()=>{
    remove_effect();
    select_summary.classList.add('crrnt_button');
})
url_shortener.addEventListener('click',()=>{
    remove_effect();
    url_shortener.classList.add('crrnt_button');
})
rephraser.addEventListener('click',()=>{
    remove_effect();
    rephraser.classList.add('crrnt_button');
})
plag.addEventListener('click',()=>{
    remove_effect();
    plag.classList.add('crrnt_button');
})







var func_object = {
    count: 0,
}
textholder.classList.add('current_stat');

async function callTextGeneratorAPI(inputText) {


    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer gAAAAABk_Ej2dOWDimJ8dJDClda18R1jDD8eBreegQVBvBZeLjU2m6RbtW59Bhx-FH5vpZC0fqCHqYcy_LC_zQIm8HiicpdQp1RoORc4_podRB1l4UcgLbBaXoof9MAVjJ7SjdbJn2t8' },
        body: `{"max_tokens":512,"model":"chat-sophos-1","n":1,"source_lang":"en","target_lang":"en-us","temperature":0.7,"text":"${inputText}"}`
    };

    try {
        let data = await fetch('https://api.textcortex.com/v1/texts/expansions', options);
        let response = await data.json();
        loader.classList.remove('current_stat')
        textholder.classList.add('current_stat')
        textholder.textContent = response.data.outputs[0].text;
        console.log(response.data.outputs[0].text)

    } catch (error) {
        alert(error)
    }


}
async function summarizer(inputText) {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer zdQ3U9x4sUTzVQUPUzXRcvlWHbiERdWP2k1uAvpU'
        },
        body: JSON.stringify({
            length: 'medium',
            format: 'paragraph',
            model: 'command',
            extractiveness: 'low',
            temperature: 0.3,
            text: inputText,
        })
    };

    try {
        let data = await fetch('https://api.cohere.ai/v1/summarize', options);
        let response = await data.json();
        loader.classList.remove('current_stat')
        textholder.classList.add('current_stat')
        textholder.textContent = response.summary;
        console.log(response);
    } catch (error) {
        alert(error);
    }



}

async function short(inputText) {

    // let shortURL = document.getElementById("shorturl");

    const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputText}`);
    const data = await result.json();
    loader.classList.remove('current_stat')
    textholder.classList.add('current_stat')
    console.log(data);
    textholder.textContent = data.result.short_link;
}








// plagiarism check

async function checkPlag(inputText){
	const url = 'https://plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com/plagiarism';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'a7769ebd4dmsh5fdfea7b5e20a7ep1e8207jsn21775637e90c',
		'X-RapidAPI-Host': 'plagiarism-checker-and-auto-citation-generator-multi-lingual.p.rapidapi.com'
	},
	body: JSON.stringify({
        text: `${inputText}`,
        language: 'en',
        includeCitations: false,
        scrapeSources: false
    })
    
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
    loader.classList.remove('current_stat')
    textholder.classList.add('current_stat')
	textholder.textContent=result.percentPlagiarism+"% plagiarism";
} catch (error) {
	console.error(error);
}
}



// para rephraser
async function getData(inputText) {
    try {
        let data = await fetch("https://api.ai21.com/studio/v1/paraphrase", {
            headers: {
                "Authorization": "Bearer CKC3qUdJLEtKYGAnQaUnFhXopSr3LTZW",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "text": `${inputText}`
            }),
            method: "POST"
        });
        let response = await data.json();
        loader.classList.remove('current_stat')
        textholder.classList.add('current_stat')
        textholder.innerText = `1.${response.suggestions[0].text}\n
                              2.${response.suggestions[1].text}\n
                              1.${response.suggestions[2].text}\n
                              4.${response.suggestions[3].text}\n
                              5.${response.suggestions[4].text}\n
                              6.${response.suggestions[5].text}`;
    } catch (e) {
        alert(e.message);
    }
}


//error correction 






var func_array = [
    checkPlag,summarizer,callTextGeneratorAPI, short, getData
]
select_expand.addEventListener('click', () => {
    input.value = ''
    textholder.textContent=''
    func_object.count = 2;
})
select_summary.addEventListener('click', () => {
    input.value = ''
    textholder.textContent=''
    func_object.count = 1;
})
url_shortener.addEventListener('click', () => {

    input.value = ''
    textholder.textContent=''
    func_object.count = 3;
})
rephraser.addEventListener('click', () => {
    input.value = ''
    textholder.textContent=''
    func_object.count = 4;
})
plag.addEventListener('click', () => {
    input.value = ''
    textholder.textContent=''
    func_object.count = 0;
})


function gnerate_response() {
    textholder.classList.remove('current_stat')
    loader.classList.add('current_stat')
    console.log("generating response");
    let count = func_object.count;
    func_array[count](input.value);
}
generate.addEventListener('click', gnerate_response)




// to summarizze a text 






