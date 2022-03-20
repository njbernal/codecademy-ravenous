const apiKey = "XQ9sGCeCOPzMy-2eY050U3rKE9sLrxeMXA9-Ltz8iD7eg2_mFo1WPj0KdqQeq1qfXYnsErwKuuoAoWUCNH0-KiJ3CETyJnuxB1Zx1rDxAfVHzjCeEe-qCVAVuMIoYnYx";

const yelp = {
    async search(term, location, sortBy) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;        return await fetch(url, { 
            headers: { 
                Authorization: `Bearer ${apiKey}` 
            }
        }).then ( response => {
            return response.json();
        }).then ( jsonResponse => {
            if (jsonResponse.hasOwnProperty('businesses')) {
                const yelpArray = [];
                
                jsonResponse.businesses.map( business => {
                    const yelpObject = {
                        id: business.id,
                        imgSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                    yelpArray.push(yelpObject);
                });
                return yelpArray;
            }
        });
    }
}

export default yelp;