import { createContext, useEffect, useState } from 'react';
import queryString from 'query-string';

import { getApiRequest } from '../services/api';
import { constants } from '../utils/constants';

export const PlatformsAuthContext = createContext({});

export function PlatformsAuthProvider({ children }) {

  const [platformsAuthenticated, setPlatformsAuthenticated] = useState({});

  useEffect(() => {

    async function logInTwitter() {
      const oauthData = queryString.parse(window.location.search);
      const oauthToken = oauthData.oauth_token;
      const oauthVerifier = oauthData.oauth_verifier;

      if (oauthToken && oauthVerifier) {
        try {
          //Oauth Step 3
          const api = getApiRequest();

          await api.post(
            'platforms/signin',
            {
              platform: constants.TWITTER,
              oauthToken,
              oauthVerifier
            }
          );

          localStorage.setItem('paypost_twitter.oauth_token', oauthToken);
          setPlatformsAuthenticated(prevState => ({
            ...prevState,
            twitter: true
          }));
        } catch (error) {
          console.error(error);
        }
      }
    };

    const isConnectedOnTwitter = localStorage.getItem('paypost_twitter.oauth_token');
    if (isConnectedOnTwitter) {
      setPlatformsAuthenticated(prevState => ({
        ...prevState,
        twitter: true
      }));
    } else {
      logInTwitter();
    }

    const isConnectedOnFacebook = localStorage.getItem('paypost_facebook.oauth_token');
    if (isConnectedOnFacebook) {
      setPlatformsAuthenticated(prevState => ({
        ...prevState,
        facebook: true
      }));
    }

  }, []);

  async function signInTwitter() {
    try {
      //Oauth Step 1
      const api = getApiRequest();
      const response = await api.post('platforms/request_token', {
        platform: constants.TWITTER
      });
      const { oauthToken } = response.data;

      //Oauth Step 2
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;

    } catch (error) {
      console.error(error);
    }
  }

  async function signInFacebook(accessToken = null) {
    const api = getApiRequest();

    await api.post('/platforms/signin', {
      platform: constants.FACEBOOK,
      oauthToken: accessToken
    });

    localStorage.setItem('paypost_facebook.oauth_token', accessToken);
    setPlatformsAuthenticated(prevState => ({
      ...prevState,
      facebook: true
    }));
  }

  async function signOutPlatforms() {
    setPlatformsAuthenticated({});

    await localStorage.removeItem('paypost_facebook.oauth_token');
    await localStorage.removeItem('paypost_twitter.oauth_token');
  }

  return (
    <PlatformsAuthContext.Provider
      value={{
        signInFacebook,
        signInTwitter,
        platformsAuthenticated,
        signOutPlatforms
      }}
    >
      {children}
    </PlatformsAuthContext.Provider>
  )
}