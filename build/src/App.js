'use strict'
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    let desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function () { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
  }
  : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
  })
const __setModuleDefault = (this && this.__setModuleDefault) || (Object.create
  ? function (o, v) {
    Object.defineProperty(o, 'default', { enumerable: true, value: v })
  }
  : function (o, v) {
    o.default = v
  })
const __importStar = (this && this.__importStar) || function (mod) {
  if (mod && mod.__esModule) return mod
  const result = {}
  if (mod != null) for (const k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k)
  __setModuleDefault(result, mod)
  return result
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const react_1 = __importStar(require('react'))
const account_1 = __importDefault(require('./account'))
function App () {
  const [user, setUser] = (0, react_1.useState)('')
  const [login, setLogin] = (0, react_1.useState)(false)
  const handleOnLogin = () => {
    setLogin(true)
  }
  return (<>
      {!login
        ? (<form onSubmit={() => handleOnLogin()}>
          <label>
            User:
            <input value={user} onChange={(e) => setUser(e.target.value)}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>)
        : (<account_1.default user={user}/>)}
    </>)
}
exports.default = App
