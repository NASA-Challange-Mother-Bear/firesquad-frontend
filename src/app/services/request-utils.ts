export function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}


export function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function deleteCookie(cname) {
  const d = new Date(); // Create an date object
  d.setTime(d.getTime() - (1000 * 60 * 60 * 24)); // Set the time to the past. 1000 milliseonds = 1 second
  const expires = 'expires=' + d.toUTCString(); // Compose the expirartion date
  window.document.cookie = cname + '=' + '; ' + expires; // Set the cookie with name and the expiration date

}

export interface GeoJSONArray {
  type: string;
  features: GeoJSON[];
}

export interface GeoJSON {
  geometry: any;
  properties: any;
  type: string;
  id?: number;
}

export function geoJsonToModel<T>(geoJson: GeoJSON): T {
  return {
    ...geoJson.geometry,
    ...geoJson.properties
  } as T;
}
