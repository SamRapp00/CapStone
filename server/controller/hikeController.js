let id = 11;

const sentHikes = new Set();


const hikes = [
    {
        id: 1,
        name: "Stewart Falls",
        imageURL: "TEST",
        miles: 5,
        rating: 3,
    },
    {
        id: 2,
        name: "BattleCreek Falls",
        imageURL: "Test",
        miles: 2,
        rating: 3,
    }
];


    
    


const getRandomHike = (req, res) => {
    const availableHikes = hikes.filter(hike => !sentHikes.has(hike));

    if (availableHikes.length === 0) {
        sentHikes.clear();
        return res.status(404).json({ message: 'No more available hikes' });
    }

    const randomIndex = Math.floor(Math.random() * availableHikes.length);
    const randomHike = availableHikes[randomIndex];

    sentHikes.add(randomHike);

    res.status(200).json(randomHike);
};

const createHike = (req, res) => {
    const { rating } = req.body;
    console.log(req.body)
    const newHike = { ...req.body, id, rating: +rating };
    hikes.push(newHike);
    id += 1;
    res.status(200).json(newHike);
};

const deleteHike = (req, res) => {
    const { id } = req.params; // ID VS IDENTIFICATION??
    const index = hikes.findIndex(hike => hike.id === +id);
    if (index !== -1) {
        hikes.splice(index, 1);
        res.status(200).json({ message: 'Hike deleted successfully' });
    } else {
        res.status(404).json({ message: 'Hike not found' });
    }
};

const editHike = (req, res) => {
    const { identification } = req.params;
    const { type } = req.body;
    const hike = hikes.find(hike => hike.id === +identification);
    if (hike) {
        if (type === "plus" && hike.rating < 5) {
            hike.rating++;
            res.status(200).json(hikes);
        } else if (type === "minus" && hike.rating > 1) {
            hike.rating--;
            res.status(200).json(hikes);
        } else {
            res.status(400).json({ message: 'Invalid type provided' });
        }
    } else {
        res.status(404).json({ message: 'Hike not found' });
    }
};

const getAllHikes = (req, res) => {
    res.status(200).json(hikes);
};

module.exports = { getRandomHike, getAllHikes, createHike, deleteHike, editHike };
