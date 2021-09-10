import React from 'react';
import { Button } from 'antd';

import { observer } from 'mobx-react';
import currencyStore from '../../../../store/currencyStore';

const styles = {
  historyContainer: {
    maxHeight: 400,
  },
};

const ConvertHistory = observer(() => {
  const {
    lastXHistory, hasMoreHistory,
  } = currencyStore;

  return (
    <div className='flexColumn'>
      <div className='flexRow flexCenterCenter'>
        <i className='m8b mr16'>
          {'Convert History'}
        </i>
        <Button
          size='small'
          onClick={currencyStore.clearHistory}
        >
          Clear
        </Button>
      </div>
      <div className='flexColumn overflowScroll' style={styles.historyContainer}>
        {
          lastXHistory.map(h =>
            <p key={h.id} className='font--18 m8b'>
              {`${h.from} ${h.fromSymbol} => ${h.to} ${h.toSymbol}`}
            </p>
          )
        }
        {hasMoreHistory &&
          <Button type="link" onClick={() => currencyStore.loadMoreHistory()}>
            Load More
          </Button>
        }
      </div>
    </div>
  );
});

export default ConvertHistory;