let cardIdAttrs=[
    {label:'Gender',key:'gender'},
    {label:'Birth year',key:'birth_year'}
]
let cardApprAttrs=[
    {label:'Height',key:'height'},
    {label:'Mass',key:'mass'},
    {label:'Hair color',key:'hair_color'},
    {label:'Eye color',key:'eye_color'},
    {label:'Skin color',key:'skin_color'},
]
let cardCastingAttrs=[
    {label:'Created',key:'created'},
    {label:'Edited',key:'edited'}
]
let cardLinksAttrs=[
    {label:'Homeworld',key:'homeworld'},
    {label:'Species',key:'species'},
    {label:'Starships',key:'starships'},
    {label:'Vehicles',key:'vehicles'},
    {label:'Films',key:'films'}
]

export const cardAttrs={
    id:cardIdAttrs,
    appr:cardApprAttrs,
    casting:cardCastingAttrs,
    links:cardLinksAttrs
}

export const linkAttrs={
    people:[
      {label:'Gender',key:'gender'},
      {label:'Birth year',key:'birth_year'},
      {label:'Height',key:'height'},
      {label:'Mass',key:'mass'},
      {label:'Hair color',key:'hair_color'},
      {label:'Eye color',key:'eye_color'},
      {label:'Skin color',key:'skin_color'},
      {label:'Created',key:'created'},
      {label:'Edited',key:'edited'},
      //{label:'Homeworld',key:'homeworld'},
      //{label:'Species',key:'species'},
      //{label:'Starships',key:'starships'},
      //{label:'Vehicles',key:'vehicles'},
      //{label:'Films',key:'films'}
    ],
    planets:[
      {label:'Created',key:'created'},
      {label:'Edited',key:'edited'},
      {label:'Climate',key:'climate'},
      {label:'Diameter',key:'diameter'},
      {label:'Gravity',key:'gravity'},
      {label:'Orbital period',key:'orbital_period'},
      {label:'Population',key:'population'},
      {label:'Surface water',key:'surface_water'},
      {label:'Terrain',key:'terrain'},
      //{label:'Films',key:'films'},
      {label:'Residents',key:'residents'}    
    ],
    species:[
      {label:'Created',key:'created'},
      {label:'Edited',key:'edited'},
      {label:'Average height',key:'average_height'},
      {label:'Average lifespan',key:'average_lifespan'},
      {label:'Classification',key:'classification'},
      {label:'Designation',key:'designation'},
      {label:'Eye colors',key:'eye_colors'},
      {label:'Language',key:'language'},
      {label:'Hair colors',key:'hair_colors'},
      {label:'Skin colors',key:'skin_colors'},
      //{label:'Films',key:'films'},
      {label:'Homeworld',key:'homeworld'},
      {label:'People',key:'people'},
    ],
    starships:[
      {label:'Pilots',key:'pilots'},
      {label:'MGLT',key:'MGLT'},
      {label:'Cargo capacity',key:'cargo_capacity'},
      {label:'Consumables',key:'consumables'},
      {label:'Cost in credits',key:'cost_in_credits'},
      {label:'Created',key:'created'},
      {label:'Crew',key:'crew'},
      {label:'Edited',key:'edited'},
      {label:'Hyperdrive rating',key:'hyperdrive_rating'},
      {label:'Length',key:'length'},
      {label:'Manufacturer',key:'manufacturer'},
      {label:'Max atmosphering speed',key:'max_atmosphering_speed'},
      {label:'Model',key:'model'},
      {label:'Name',key:'name'},
      {label:'Passengers',key:'passengers'},
      {label:'Starship class',key:'starship_class'},
      //{label:'films',key:'films'}
    ],
    vehicles:[
      {label:'Cargo capacity',key:'cargo_capacity'},
      {label:'Consumables',key:'consumables'},
      {label:'Cost in credits',key:'cost_in_credits'},
      {label:'Created',key:'created'},
      {label:'Crew',key:'crew'},
      {label:'Edited',key:'edited'},
      {label:'Length',key:'length'},
      {label:'Manufacturer',key:'manufacturer'},
      {label:'Max atmosphering speed',key:'max_atmosphering_speed'},
      {label:'Model',key:'model'},
      {label:'Passengers',key:'passengers'},
      {label:'Vehicle class',key:'vehicle_class'},
      {label:'Pilots',key:'pilots'},
      //{label:'films',key:'films'}
    ],
    films:[
      {label:'Created',key:'created'},
      {label:'Director',key:'director'},
      {label:'Edited',key:'edited'},
      {label:'Episode id',key:'episode_id'},
      {label:'Opening crawl',key:'opening_crawl'},
      {label:'Producer',key:'producer'},
      {label:'Release date',key:'release_date'},
      {label:'Characters',key:'characters'},
      {label:'Planets',key:'planets'},
      {label:'Species',key:'species'},
      {label:'Starships',key:'starships'},
      {label:'Vehicles',key:'vehicles'}
    ]
  }
  export const linkTitle={
    people:'name',
    planets:'name',
    species:'name',
    starships:'name',
    vehicles:'name',
    films:'title'
  }