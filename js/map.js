maptilersdk.config.apiKey = 'xThl9JAL6vdHLCgZdk5v';
const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: [85.300140, 27.700769],
    zoom: 14 
});

map.on('click', (e) => {
    console.log(e)
    const description = `<form style="width:600px;">
                            <div>
                              <p>Longitude:</p>
                              <input id="longitude" value=${e.lngLat.lng} name="longitude"/>
                            </div>

                            <div>
                              <p>Latitude:</p>
                              <input id="latitude" value=${e.lngLat.lat} name="latitude" />
                            </div>

                            <div>
                             <p>Upload a File:</p>
                             <input id="file_path" type="file" name="file">
                            </div>

                            <div>
                              <textarea id="description" placeholder="Description" rows="10" cols="25" name="description"></textarea>
                            </div>
                            <button type="button" onclick="submitForm()">Submit</button>
                        </form>
                       `
    new maptilersdk.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
});

function submitForm() {
    // Get form data
    const filename = document.getElementById('file_path').value;
    const file_path = filename.substring(filename.lastIndexOf('\\') + 1);
    console.log(file_path)
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const description = document.getElementById('description').value;

    // Create data object
    const data = {
      file_path,
      latitude,
      longitude,
      description
    };

    // Make a POST request using Axios
    axios.post('http://localhost:8000/submit/', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        signInWithGoogle()
      });
}