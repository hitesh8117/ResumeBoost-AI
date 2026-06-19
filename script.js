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

const file =
document.getElementById("resumeFile").files[0];

if(!file){
alert("Please upload a resume");
return;
}

const reader = new FileReader();

reader.onload = async function(){

const typedarray =
new Uint8Array(reader.result);

const pdf =
await pdfjsLib.getDocument({
data:typedarray
}).promise;

let text="";

for(let i=1;i<=pdf.numPages;i++){

const page =
await pdf.getPage(i);

const content =
await page.getTextContent();

text += content.items
.map(item=>item.str)
.join(" ");
}

generateResult(text);

};

reader.readAsArrayBuffer(file);
}

function generateResult(text){

const lower = text.toLowerCase();

let found=[];

skills.forEach(skill=>{
if(lower.includes(skill)){
found.push(skill);
}
});

const missing =
skills.filter(
skill=>!found.includes(skill)
);

let score =
Math.min(
100,
found.length*12
);

document.getElementById("result").innerHTML=`

<div class="score-section">

<div class="score-circle"
style="--score:${score}%">

<div class="score-inner">

<div class="score-number">
${score}
</div>

<div class="score-label">
ATS SCORE
</div>

</div>

</div>

</div>

<div>

<div class="section-title">
Skills Found
</div>

<div class="badges">

${found.map(skill=>
`<span class="badge found">${skill}</span>`
).join("")}

</div>

</div>

<div>

<div class="section-title">
Missing Skills
</div>

<div class="badges">

${missing.map(skill=>
`<span class="badge missing">${skill}</span>`
).join("")}

</div>

</div>

<div class="recommendation">

<b>Recommendation:</b><br><br>

Add project descriptions,
quantifiable achievements,
modern technologies like React,
Node.js and MongoDB,
and highlight GitHub deployments
to improve ATS ranking.

</div>

`;

}