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
const moment_1 = __importDefault(require('moment'))
const react_1 = __importStar(require('react'))
function Account ({ user }) {
  const [data, setData] = (0, react_1.useState)([])
  const [status, setStatus] = (0, react_1.useState)('pending')
  const getTransaction = () => {
    fetch('http://localhost:3001/api/Transactions/' + user)
      .then((res) => res.json())
      .then((data) => setData(data))
    setStatus('resolved')
  };
  (0, react_1.useEffect)(() => {
    getTransaction()
  }, [])
  if (status === 'pending') {
    return <div>Loading...</div>
  }
  return (<>
      <ul className="App">
        {data.map((transaction) => {
          return (<div key={transaction.id}>
              <li>Amount: {transaction.amount}</li>
              <li>Type: {transaction.type}</li>
              <li>Old Total: {transaction.oldTotal}</li>
              <li>New Total: {transaction.newTotal}</li>
              <li>
                Date: {(0, moment_1.default)(transaction.createdAt).utc().format('YYYY-MM-DD')}
              </li>
              <hr />
            </div>)
        })}
      </ul>
    </>)
}
exports.default = Account
