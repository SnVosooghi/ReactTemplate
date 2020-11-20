import Nav from '../components/nav'
import {connect} from 'react-redux'

function SignInPage(props) {
  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-accent-1" onClick = { () => console.log(props.listFlat)}>
          Next.js + Tailwind CSS
        </h1>
      </div>
    </div>
  )
}




const mapStateToProps = (state) => ({
  listFlat: state.articles.listFlat || [],
  listPaginated: state.articles.listPaginated || {},
  meta: state.articles.meta || [],
  pagination: state.articles.pagination || {},
});

const mapDispatchToProps = (dispatch) => ({
  login: (credintials) => dispatch.auth.login( credintials),
  googleLogin : dispatch.auth.googleLogin,
  facebookLogin : dispatch.auth.facebookLogin,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
