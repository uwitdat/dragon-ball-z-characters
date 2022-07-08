const DB = require('./init.js');

const data = [
  {
    name: 'Goku',
    gender: 'Male',
    specialMove: 'Kamehameha',
    race: 'Saiyan',
    sprite: 'https://imgix.ranker.com/list_img_v2/1341/2681341/original/best-goku-quotes-u1?w=817&h=427&fm=jpg&q=50&fit=crop'
  },
  {
    name: 'Vegeta',
    gender: 'Male',
    specialMove: '',
    race: 'Saiyan',
    sprite: 'https://alfabetajuega.com/hero/2020/06/Vegeta-1.jpg?width=1200&aspect_ratio=1200:631'
  },
]

const wipeDB = async () => {
  try {
    await DB.character.deleteMany({})
  } catch (err) {
    console.log(err.message)
  }
}

const seedDB = async () => {
  try {
    await Promise.all(
      data.map((char) => {
        return DB.character.create({ data: char })
      })
    )

  } catch (err) {
    console.log(err.message)
  }
}

const wipeAndSeed = async () => {
  try {
    await Promise.all([seedDB, wipeDB])
    console.log('success')
  } catch (err) {
    console.log(err.message)
  }

}

wipeAndSeed();