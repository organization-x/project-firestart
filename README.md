# project-firestart
## **Problem**

Oil & gas extraction operations burn off excess natural gas (methane) when the extraction exceeds purification and pipeline capacities. However, in recent years flyovers show that in major basins 5% of flares are unlit and venting, while another 5% are malfunctioning with incomplete combustion. Here’s an example study from the [Permian basin](https://www.edf.org/media/through-turbulent-year-edf-data-show-permian-oil-and-gas-operators-consistently-failed-keep). Since methane is a far more potent gas than CO2, venting this gas into the atmosphere contributes significantly to global warming - burning (flaring)  it reduces the warming effects by 96%.

## **Proposed Solution**

### **High Level**

After some discussion with academics and oil companies as to why this may be happening, we concluded that the lowest cost way of reducing these emissions without expensive retrofits to the flares is a monitoring system that can alert the company to the outage right away. Therefore, they know about it and can relight as soon as the outage happens, rather than 24-48 hours later when a field worker visits and happens to notice. This can reduce the amount of methane going into the atmosphere by 85% (assuming 2 hours response time & 24 intra site visit interval).

The lowest cost continuous monitoring system that we envision is a low cost phone in a waterproof case & solar panels mounted on a nearby fence pointed at the flare. This system would provide pictures and / or videos of the flare. Your challenge is to build a machine learning pipeline to process these images  / photos in order to determine the status of the flare.

### **MVP**

- Gather photos / videos of flares and classify them for training. Here’s an example from Youtube: [https://www.youtube.com/shorts/weGgxTkoYt8](https://www.youtube.com/shorts/weGgxTkoYt8) - this video has both lit and unlit flares examples. Determine how many images / videos do you need? The academics / non profits working on this likely also have image repositories, but let’s see if Youtube and the internet have enough
- Write a system that processes and trains on this data (and any new ones we may obtain in the future)
- Build an ML system that given a new image can say whether the flare is on or not
- Final Product will be an mobile app build with react native. The app will periodically take pictures of the gas flare and send it to the pytorch model. It will determine whether the flare is lit or unlit. If the flare is unlit the app send a SMS or email notification to all provided phone numbers and email addresses.

**MADE BY:**
Asad Shahid and more
