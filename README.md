# Project Firestart
AI driven gas flare monitoring application!
<div id="top"></div>
<!--
*** Thanks for checking out Firestart. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
-->

<br />
<div align="center">
  <a href="https://github.com/organization-x/project-firestart/">
    <img src="./assets/icon.png" alt="Logo" width="500" height="500">
  </a>

  <h3 align="center">Get Your Flare On!</h3>

  <p align="center">
    <a href="https://youtu.be/Ts2MYXkeRdw">Project Video</a>
    ·
    <a href="https://github.com/organization-x/project-firestart/issues">Report Bug</a>
    ·
    <a href="https://github.com/organization-x/project-firestart/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#model">Machine Learning Model</a></li>
    <li><a href="#team">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


Problem:
  Oil & gas extraction operations burn off excess natural gas (methane) when the extraction exceeds purification and pipeline capacities. However, in recent years flyovers show that in major basins 5% of flares are unlit and venting, while another 5% are malfunctioning with incomplete combustion. Here’s an example study from the [Permian basin](https://www.edf.org/media/through-turbulent-year-edf-data-show-permian-oil-and-gas-operators-consistently-failed-keep). Since methane is a far more potent gas than CO2, venting this gas into the atmosphere contributes significantly to global warming - burning (flaring)  it reduces the warming effects by 96%.

Solution:
  Android application that continually monitors flare. Takes a picture every few seconds and sends to AI model to classify. If classified as unlit sends notification to all phone numbers in contact list through Twilio API. 

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With
<ol>
<li>React Native</li>
<li>Roboflow</li>
<li>Twilio</li>
</ol>



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Let's get you started!

### Installation


1. Contact Firestart team for Roboflow api key
2. Clone the repo
   ```sh
   git clone https://github.com/organization-x/project-firestart/
   ```
3. Install packages
   ```sh
   npm install
   ```
4. Create twillio account and create a twilio service for sending sms (https://www.twilio.com/docs/serverless/functions-assets/quickstart/send-sms-and-mms)

5. Switch environment variables in .env

6.Follow steps for expo deployment!

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- DEMO -->
## Demo

Watch walkthrough video <a href="https://youtu.be/Ts2MYXkeRdw">here</a>.



<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MODEL -->
## Model

Ai model with 98.2% validation accuracy. Trained on Roboflow.com.



<p align="right">(<a href="#top">back to top</a>)</p>


<!-- TEAM -->
## Team
<ol>
<li>Team Lead: Seth Bassetti</li>
<li>Product Manager: Asad Shahid (https://github.com/AsadShahid04)</li>
<li>Frontend Developer: Alan Than</li>
<li>Frontend Developer: Pallavi Kamat(https://github.com/pkam001)</li>
<li>Machine Learning Engineer: Arhant Choudhary(https://github.com/gorpyshortlegs/)</li>
<li>Machine Learning Engineer: Keilani Li(https://github.com/keil4ni)</li>
</ol>


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>









<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


* [Frost Methane](https://www.frostmethane.com)
* [AI Camp](https://www.ai-camp.org)
* [Github readme template](https://github.com/othneildrew/Best-README-Template)



<p align="right">(<a href="#top">back to top</a>)</p>


