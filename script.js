const skills = [
"html",
"css",
"javascript",
"react",
"node",
"mongodb",
"python",
"java",
"c++",
"sql",
"git",
"github"
];

async function analyzeResume(){

const file = document.getElementById("resumeFile").files[0];

if(!file){
alert("Upload Resume");
return;
}

const reader = new FileReader();

reader.onload = async function(){

const typedarray = new Uint8Array(reader.result);

const pdf = await pdfjsLib.getDocument({
data: typedarray
}).promise;

let text = "";

for(let i=1;i<=pdf.numPages;i++){

const page = await pdf.getPage(i);

const content = await page.getTextContent();

text += content.items.map(
item=>item.str
).join(" ");
}

runAnalysis(text);

};

reader.readAsArrayBuffer(file);
}

function runAnalysis(text){

const lower = text.toLowerCase();

let found = [];

skills.forEach(skill=>{
if(lower.includes(skill)){
found.push(skill);
}
});

let score = Math.min(
100,
(found.length * 12)
);

let missing = skills.filter(
s=>!found.includes(s)
);

document.getElementById("result").innerHTML = `
<h2>ATS Score : ${score}/100</h2>

<p><b>Skills Found:</b><br>
${found.join(", ")}</p>

<p><b>Missing Skills:</b><br>
${missing.join(", ")}</p>

<p><b>Recommendation:</b><br>
Add more technical skills and project details.</p>
`;

}
