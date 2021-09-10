import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { DeleteOutlined, DownCircleOutlined } from '@ant-design/icons';

import currencyStore from '../../../../store/currencyStore';
import Store from '../../../../store';


const styles = {
  graphContainer: {
    height: 400,
    width: 400,
    backgroundColor: 'white',
  },
  graphText: {
    color: 'black',
  },
  favouriteContainer: {
    height: 349,
    width: 400,
  },
};

const CurrencyGraph = observer((props) => {
  const {
    switchInputSymbol,
    switchConvertSymbol,
  } = props;
  const { favouriteCurrency } = currencyStore;
  useEffect(() => {
    Store.timeSeries();
  }, [])

  return (
    <div className='flexColumn m32b'>
      <div className='flexRow flexCenterCenter'>
        <i className='m8b mr16'>
          {'History Graph'}
        </i>
      </div>
      <div className='flexRow flexStartCenter'>
        <div className='flexCenterCenter mr16' style={styles.graphContainer}>
          <label style={styles.graphText}>
            Graph placeholder
          </label>
        </div>
        <div className='flexColumn flexAlignCenter'>
          <label>
            My favourite currency
          </label>
          <div className='flexColumn overflowScroll' style={styles.favouriteContainer}>
            {
              favouriteCurrency.map(c =>
                <div key={c} className='flexRow flexAlignCenter m8b flexEvenly'>
                  <label className='font--18'>
                    {c}
                  </label>
                  <Button
                    type='link'
                    icon={<DownCircleOutlined />}
                    onClick={() => switchInputSymbol(c)}
                  >
                    Set From
                  </Button>
                  <Button
                    type='link'
                    icon={<DownCircleOutlined />}
                    onClick={() => switchConvertSymbol(c)}
                  >
                    Set To
                  </Button>
                  <Button
                    type='link'
                    icon={<DeleteOutlined />}
                    disabled={favouriteCurrency.length <= 1}
                    onClick={() => currencyStore.removeFavouriteCurrency(c)}
                    danger
                  >
                    Remove
                  </Button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
});

export default CurrencyGraph;