import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Modal from '../../shared/components/modal';
import BudgetList from './budget-list';
import BudgetManage from './budget-manage';
import { setSelectedBudget, setSelectedModal } from './budgets-slice';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainContainer: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

const BudgetPage = () => {
  const classes = useStyles();

  const { selectedModal, selectedBudget } = useAppSelector(
    (state) => state.budgets
  );

  const dispatch = useAppDispatch();

  const budgetManageModalTitle = selectedBudget
    ? 'Edit Budget'
    : 'Add New Budget';

  const handleOpenBudgetModal = () => {
    dispatch(setSelectedModal('manageBudgetModal'));
  };

  const handleCloseBudgetModal = () => {
    dispatch(setSelectedModal(null));
    dispatch(setSelectedBudget(null));
  };

  return (
    <div>
      <Modal
        title={budgetManageModalTitle}
        isVisible={selectedModal === 'manageBudgetModal'}
        onClose={handleCloseBudgetModal}
      >
        <BudgetManage />
      </Modal>
      <div className={classes.topContainer}>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={handleOpenBudgetModal}
        >
          Add Budget
        </Button>
      </div>
      <div className={classes.mainContainer}>
        <BudgetList />
      </div>
    </div>
  );
};

export default BudgetPage;
