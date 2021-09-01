import { Observable } from 'rxjs';
import { Entity } from '../models/entity.model';
import { PagedResult } from '../models/pagedResult.model';
import { QueryInfo } from '../models/queryInfo.model';
import { BaseApi } from './baseApi';

export abstract class BaseApiService<T extends Entity> {

    protected constructor(protected api: BaseApi, protected path: string) { }

    /**
     * Recupera uma entidade pelo Id
     */
    getById(id: string): Observable<T> {
        return this.api.get(`${this.path}/${id}`);
    }

    /**
     * Recupera uma lista de entidades
     */
    getAll(): Observable<T[]> {
        return this.api.get(this.path);
    }

    /**
     * Insere uma entidade no banco de dados
     */
    insert(entity: Entity): Observable<any> {
        return this.api.post(this.path, entity);
    }

    /**
     * Atualiza uma entidade no banco de dados
     */
    update(entity: Entity): Observable<any> {
        return this.api.put(`${this.path}/${entity.id}`, entity);
    }

    /**
     * Remove uma entidade do Banco de dados
     */
    delete(id: string): Observable<any> {
        return this.api.delete(`${this.path}/${id}`);
    }

    /**
     * Obtém uma lista com as entidades considerando filtros, paginação e ordenação. 
     */
     list(query: QueryInfo): Observable<PagedResult<T>> {
        return this.api.post(`${this.path}/list`, query, {});
    }
}
