import { FaGoogle } from 'react-icons/fa';
import { Auth } from 'aws-amplify'

function SocialSignIn() {
  return (
    <div className="flex flex-col">
      <button className="mt-10 focus:outline-none" onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
        <div className="flex border border-gray-300 p-2 rounded-full items-center justify-center">
          <FaGoogle size="38" className="text-red-600" />
          <p className="ml-3">Sign in with Google</p>
        </div>
      </button>
    </div>
  )
}

export default SocialSignIn