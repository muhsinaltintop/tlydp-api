<h1>The Little Yellow Duck Project (Backend)</h1>
  
  
  <b>Hosted version:</b> https://tlydp.herokuapp.com/api <br >
  <b>Frontend repository of the project:</b> https://github.com/aakirahin/encee-nuz <br >
  <b>Presentation of the Project:</b> https://youtu.be/NuYAaqwzwyE?t=19646


<h2>Summary</h2>
The Little Yellow Duck Project is 



Express server interacts with a PSQL database for the function of the TLYDP app which has following end points:

"GET /api": {}, <br >
"GET /api/ducks": {}, <br >
"GET /api/ducks/:duck_id": {}, <br >
"GET /api/ducks/found": {}, <br >
"GET /api/ducks/unfound": {}, <br >
"PATCH /api/ducks/:duck_id": {}, <br >
"POST /api/ducks/": {} <br >

Please check the details of endpoints here: https://tlydp.herokuapp.com/api

<h2>How to Install Locally:</h2> 
If you would like to work on project on your own. You can fork the project to your github account and then clone it to your local machine via Git.
<br>

<h3>Minimum requirements:</h3>
<ul>
<li>Node: v17.1.0 </li>
<li>PostgreSQL: 12.9 </li>

<h3>Dependencies:</h3>
<ul>
  <li>cors: 2.8.5</li>
  <li>dotenv: 14.2.0</li>
  <li>express: 4.17.2</li>
  <li>jest-cli: 27.4.7</li>
  <li>pg: 8.7.1</li>
  <li>pg-format: 1.0.4</li>
</ul>
<br>
<h3>Dev Dependencies:</h3>
<ul>
  <li>jest: 27.4.7</li>
  <li>supertest: 6.2.2</li>
  </ul>



<h3>Setup</h3>
Run npm install to install dependencies.
