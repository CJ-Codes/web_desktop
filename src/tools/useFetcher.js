import { useState, useEffect, useRef } from 'react';

// request data
export function useFetcher(address, config = { method: 'GET' }) {
  const
    [data, setData] = useState(null),
    ref = useRef({address, config, refer: data});

  useEffect(() => {
    const { address, config, refer } = ref.current;

    if (refer) return; // prevent change
    fetch(address, config)
      .then(checkStatus)
      .then(parseJSON)
      .then( data => {
        setData(data); // change data
        Object.assign(ref.current, { refer: data }) // change reference
      })

      .catch( e => { console.log(e) })
  }, [])

  return data
}

// 检查状态码
function checkStatus(res) {
  if (res.ok && res.status >= 200 && res.status < 300) {
    return res
  }

  const err = new Error('stateus: '+res.status+', Text: '+res.statusText)
  throw err
}

const parseJSON = (response) => ( response.json() )
