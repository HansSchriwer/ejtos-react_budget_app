import { createContext, useReducer } from "react";

// Reducer function
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ALLOCATION": {
      const newAllocations = state.allocations.map((allocation) =>
        allocation.name === action.payload.name
          ? { ...allocation, budget: allocation.budget + action.payload.budget }
          : allocation
      );
      return { ...state, allocations: newAllocations };
    }

    case "RED_ALLOCATION": {
      const newAllocations = state.allocations.map((allocation) =>
        allocation.name === action.payload.name
          ? {
              ...allocation,
              budget: Math.max(allocation.budget - action.payload.budget, 0),
            }
          : allocation
      );
      return { ...state, allocations: newAllocations };
    }

    case "DELETE_ITEM": {
      const newAllocations = state.allocations.map((allocation) =>
        allocation.name === action.payload.name
          ? { ...allocation, budget: 0 }
          : allocation
      );
      return { ...state, allocations: newAllocations };
    }

    case "CHG_CURRENCY":
      return { ...state, currency: action.payload };

    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };

    default:
      return state;
  }
};

// Initial state for the context
const initialState = {
  allocations: [
    { id: "Marketing", name: "Marketing", budget: 0 },
    { id: "Finance", name: "Finance", budget: 0 },
    { id: "Sales", name: "Sales", budget: 0 },
    { id: "HumanResource", name: "Human Resource", budget: 0 },
    { id: "IT", name: "IT", budget: 0 },
  ],
  currency: "£",
  budget: 0,
};

// Create context
export const AppContext = createContext();

// Context provider component
export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Calculate total allocation
  const totalAllocation = state.allocations.reduce((total, item) => {
    return total + item.budget;
  }, 0);

  // Calculate remaining budget
  const remainingBudget = state.budget - totalAllocation;

  return (
    <AppContext.Provider
      value={{
        allocations: state.allocations,
        totalAllocation,
        dispatch,
        currency: state.currency,
        budget: state.budget,
        remainingBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
