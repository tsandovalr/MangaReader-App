import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetManga  } from './manga.action';
import { UserManga } from './manga.model';

@State({
    name: "manga_id",
    defaults: {
        manga_id: 'vacio'
    }
})
@Injectable({
    providedIn: 'root'
})
export class StateManga{
    
    @Selector()
    static getManga(state: UserManga){
        return state.manga_id;
    }

    @Action(SetManga)
    setUser({ patchState}: StateContext<UserManga>, { payload }: SetManga){
        patchState({
            manga_id: payload
        })
    }

}