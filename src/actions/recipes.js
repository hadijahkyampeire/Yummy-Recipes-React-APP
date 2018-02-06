import instance from './AxiosInstance';
import { 
    ROOT_URL, CREATE_RECIPE, FETCH_RECIPES, FETCH_RECIPE, FETCH_CATEGORY_RECIPES, DELETE_RECIPE, EDIT_RECIPE 
} from '../constants';

export const createRecipe = (values, cat_id, callback) => {
    const request = instance.post(`${ROOT_URL}/recipe_category/${cat_id}/recipes`, values)
        .then(() => callback());
    
    return {
        type: CREATE_RECIPE,
        payload: request
    }
}

export const fetching = () => {
    return {
        type: "FETCHING"
    }
}

export const fetchRec = (res) => {
    return {
        type: FETCH_RECIPES,
        payload: res,
    }
}

// action creator for fetching recipes from the database
export const fetchRecipes = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching);
            const request = await instance.get(`${ROOT_URL}/recipes`);

            dispatch(fetchRec(request));
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid authentication credentials"
            });
        }
    }
}

// action creator for fetching recipes in category from the database
export const fetchCategoryRecipes = (id) => {
    return async (dispatch) => {
        try {
            dispatch(fetching);
            const request = await instance.get(`${ROOT_URL}/recipe_category/${id}/recipes`);

            dispatch({
                type: FETCH_CATEGORY_RECIPES,
                payload: request,
            });
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid authentication credentials"
            });
        }
    }
}

// action creator for fetching single recipe
export const fetchRecipe = (cat_id, recipe_id) =>{
    return async (dispatch) => {
        try {
            const request = await instance.get(`${ROOT_URL}/recipe_category/${cat_id}/recipes/${recipe_id}`);
            
            dispatch({
                type: FETCH_RECIPE,
                payload: request
            });
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
        }
    }

}

// action creator for delete recipe
export const deleteRecipe = (cat_id, recipe_id, callback) => {
    return async (dispatch) => {
        try {
            const request = await instance.delete(`${ROOT_URL}/recipe_category/${cat_id}/recipes/${recipe_id}`)
                .then(() => callback());
            dispatch({
                type: DELETE_RECIPE,
                payload: request
            });
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
        }
    }
}

// action creator for delete recipe
export const editRecipe = (values, cat_id, recipe_id, callback) => {
    return async (dispatch) => {
        try {
            const request = await instance.put(`${ROOT_URL}/recipe_category/${cat_id}/recipes/${recipe_id}`, values)
                .then(() => callback());
            dispatch({
                type: EDIT_RECIPE,
                payload: request
            });
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
        }
    }
}