export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveller in exploration',
        icon: '🧳',
        people: '1'
    },
    {
        id: 2,
        title: 'Two of Us',
        desc: 'Perfect for couples or travel buddies',
        icon: '🥂',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A family-friendly travel option',
        icon: '🏠',
        people: '3+'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Adventures with your favorite group',
        icon: '🫂',
        people: '4+'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Low-Cost',
        desc: 'Explore on a shoestring budget',
        icon: '🪙'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Enjoy a balance of comfort and value',
        icon: '💵'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Indulge in premium travel experiences',
        icon: '💎'
    }
];

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {noOfDays} days for {traveler} people with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel to each of the location, and best time to visit each location for {noOfDays} days with each day plan in JSON format."
