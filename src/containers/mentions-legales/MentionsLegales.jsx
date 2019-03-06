import React from 'react'

import saber from '../../assets/saber.png'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Category from '../home/components/category'
import Footer from '../home/components/footer'
import './mentions.css'

class MentionsLegales extends React.Component {
  render() {
    return (
      <div>
        <header className='a-intro-header'>
          <span className='a-intro__main-text'>WET3</span>
          <div className='a-intro-header__mainButton'>
            <Button
              onClick={this.props.goToHome}
              className='button_header'
              type='danger'
              size='large'
              shape='round'
            >
              Retour
            </Button>
          </div>
          <img src={saber} height='85px' />
        </header>
        <main className='a-mentions'>
          <div className='a-mentions__content'>
            <Category id='infos'>Informations générales</Category>
            <ul>
              <li>
                Site: <a href='https://flute3.sale/'>https://flute3.sale/</a>{' '}
              </li>
              <li>
                Faluche Libre Universitaire TroyennE, FLUTE 11 place Jean Jaures
                10000 Troyes 07 89 58 75 16
              </li>
              <li>mail: laflute.troyes@gmail.com</li>
              <li>Présidente: GARNIER Camille</li>{' '}
              <li>Hébergeur: ASS UTT NET GROUP</li>
            </ul>
            <Category id='lois'>Respect des lois en vigueur</Category>
            <p>
              Le site https://flute3.sale respecte la vie privée de l’internaute
              et se conforme strictement aux lois en vigueur sur la protection
              de la vie privée et des libertés individuelles. Aucune information
              personnelle n’est collectée à votre insu. Aucune information
              personnelle n’est cédée à des tiers. Les courriels, les adresses
              électroniques ou autres informations nominatives dont ce site est
              destinataire ne font l’objet d’aucune exploitation et ne sont
              conservés que pour la durée nécessaire à leur traitement.
            </p>
            <Category id='droits'>
              Droit des internautes : droit d’accès et de rectification
            </Category>
            <p>
              Conformément aux dispositions de la loi n°78-17 du 6 janvier 1978
              relative à l’informatique, aux fichiers et aux libertés, les
              internautes disposent d’un droit d’accès, de modification, de
              rectification et de suppression des données qui les concernent. Ce
              droit est exerçable en envoyant un mail à
              laflute.troyes@gmail.com.
            </p>
            <Category id='cookies'>Cookies</Category>
            <p>
              L’utilisation de ce site requiert l’installation d’un cookie,
              fichier texte qui enregistre des informations relatives à la
              navigation de votre ordinateur sur notre site (les pages
              consultées, la date et l’heure de consultation…). En aucun cas, le
              cookie ne permet de vous identifier et n’est utilisé à des fins
              commerciales. Nous vous rappelons que vous pouvez vous opposer à
              l’enregistrement de cookies en configurant votre ordinateur.
            </p>
            <Category id='propriete'>
              Droit de propriété intellectuelle
            </Category>
            <p>
              Toutes les informations ou documents contenus dans le site ainsi
              que tous les éléments créés pour le site sont soit la propriété de
              l’Association FLUTE soit font l’objet de droit d’utilisation, de
              reproduction et de représentation consentis au profit de
              l’Association FLUTE. Toutes les informations de ce site relèvent
              des législations françaises et internationales protégeant les
              droits d’auteur.
            </p>
            <p>
              Aucune licence, ni aucun droit autre que celui de consulter le
              site n’est conféré à quiconque au regard des droits de propriété
              intellectuelle. La reproduction des documents du site est
              autorisée à des fins exclusives d’information pour un usage
              personnel et privé, toute reproduction et toute utilisation de
              copie réalisée à d’autres fins est expressément interdite et
              soumise à l’autorisation préalable et expresse de l’Association
              FLUTE. La dénomination Association FLUTE, les logos et autres
              produits et marques cités sur le site sont la propriété de
              l’Association FLUTE et ne peuvent en conséquence utilisés sans
              l’autorisation écrite préalable de l’Association FLUTE.
            </p>
            <Category id='liens'>Liens hypertexte</Category>
            <p>
              L’Association FLUTE ne peut être responsable des contenus des
              sites vers lesquels elle offre des liens qui sont proposés aux
              utilisateurs en tant que service.
            </p>
            <p>
              La création de lien vers le site de l’Association FLUTE est
              soumise à l’autorisation préalable de l’Association FLUTE en
              écrivant à l’adresse mail suivante : laflute.troyes@gmail.com.
              L’Association FLUTE est dégagée de toute responsabilité concernant
              les liens hypertextes vers son site qui ont été établis.
            </p>
            <Category id='disposition'>Dispositions générales</Category>
            <p>
              L’Association FLUTE peut procéder à la mise à jour de ces
              conditions d’utilisation du site à tout moment. Les conditions
              générales d’utilisation du site sont soumises au droit français et
              relèvent de la compétence des tribunaux français.
            </p>
            <p>
              L’Association FLUTE ne pourra être responsable de tout dommage
              direct ou indirect résultant de votre visite sur son site
              internet, de l’utilisation ou de l’impossibilité d’accéder et/ou
              d’utiliser le contenu de ce site. Cette limitation concerne tout
              type de dommages directs ou indirects y compris la perte de
              données, de bénéfices et l’interruption d’activité.
            </p>
          </div>
          <Footer />
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  goToHome: () => dispatch(push('/'))
})

export default connect(
  null,
  mapDispatchToProps
)(MentionsLegales)
