import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CrateContactsAction, DeletedContactAction, editContactAction, updateContactFavorite } from './Actions/ContactActions'
import Contact from './Contact'
import EditContact from './EditContact'
import Error from './Error'
import Home from './Home'
import { GetContactsLoader, getContactLoader } from './Loaders/ContactsLoader'
import Root from './Root'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    loader: GetContactsLoader,
    action: CrateContactsAction,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: '/contacts/:contactId',
            element: <Contact />,
            loader: getContactLoader,
            action: updateContactFavorite
          },
          {
            path: '/contacts/:contactId/edit',
            element: <EditContact />,
            loader: getContactLoader,
            action: editContactAction
          },
          {
            path: '/contacts/:contactId/destroy',
            action: DeletedContactAction,
            errorElement: <div>Oops! There was an error.</div>
          }
        ]
      }
    ]
  }

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
