import React from 'react'

import './starwars.css'

const Scroll = props => (
  <div className='a-swag-container'>
    <section className='star-wars'>
      <div className={`crawl${props.animate ? ' animate' : ''}`}>
        <div className='title'>
          <p>Star Wet</p>
          <p>episode xi</p>
          <p className='long'>le retour de la koekoe</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>
          L'Empire Troyen est plus puissant que jamais. La construction de la
          nouvelle arme, la Koekoe blue de la mort, menace la France entière.
          Han Doblo est remis à l'immonde Jabba le GrandSud par l'ignoble
          chasseur de prime, l'asso Fett.
        </p>
        <p>
          Luke SkyPoutré, entraîné par Maître Coma, doit savoir user de son foie
          afin de sauver son ami.
        </p>
        <p>
          Après un Troyes 133ème pliage des extés, également sous la menace de
          Jabba le GrandSud, Luke SkyPoutré et Less Beto parviennent à
          s'échapper de la poutre...
        </p>
        <p>
          Mais ils ne sont pas encore sortis d'affaire, il leur faut affronter
          les Stormpoutreurs, connus pour être la force de pliage de l'Empire...
        </p>
        <p>Emmène ton sabre laser, et choisis ton côté de la force</p>
        <p>Que le foie soit avec toi !</p>
      </div>
    </section>
  </div>
)

export default Scroll
