/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  tents: Array<Tent>;
};

export type GroupeResponse = {
  __typename?: 'GroupeResponse';
  code: Scalars['Int'];
  group?: Maybe<Group>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup?: Maybe<GroupeResponse>;
  createTent?: Maybe<TentResponse>;
  deleteTent?: Maybe<TentResponse>;
  updateTent?: Maybe<TentResponse>;
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
};


export type MutationCreateTentArgs = {
  comments?: InputMaybe<Scalars['String']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  groupId: Scalars['String'];
  identifyingNum: Scalars['Int'];
  integrated?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  size: Scalars['Int'];
  state: State;
  unit?: InputMaybe<Unit>;
};


export type MutationDeleteTentArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTentArgs = {
  comments?: InputMaybe<Scalars['String']>;
  complete?: InputMaybe<Scalars['Boolean']>;
  groupId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  identifyingNum?: InputMaybe<Scalars['Int']>;
  integrated?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<State>;
  unit?: InputMaybe<Unit>;
};

export type Query = {
  __typename?: 'Query';
  allTentsFromGroup: Array<Tent>;
  group?: Maybe<Group>;
  groups: Array<Group>;
  tent?: Maybe<Tent>;
};


export type QueryAllTentsFromGroupArgs = {
  id: Scalars['ID'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryTentArgs = {
  id: Scalars['ID'];
};

export enum State {
  Bon = 'BON',
  Inutilisable = 'INUTILISABLE',
  Mauvais = 'MAUVAIS',
  Neuf = 'NEUF'
}

export type Tent = {
  __typename?: 'Tent';
  comments?: Maybe<Scalars['String']>;
  complete: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  group: Group;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  identifyingNum: Scalars['Int'];
  integrated: Scalars['Boolean'];
  location: Scalars['String'];
  size: Scalars['Int'];
  state: State;
  unit: Unit;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type TentResponse = {
  __typename?: 'TentResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  tent?: Maybe<Tent>;
};

export enum Unit {
  Caravelles = 'CARAVELLES',
  Farfadets = 'FARFADETS',
  Groupe = 'GROUPE',
  Guides = 'GUIDES',
  Jeannettes = 'JEANNETTES',
  Louveteaux = 'LOUVETEAUX',
  Pionniers = 'PIONNIERS',
  Scouts = 'SCOUTS'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Group: ResolverTypeWrapper<Group>;
  GroupeResponse: ResolverTypeWrapper<GroupeResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  State: State;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tent: ResolverTypeWrapper<Tent>;
  TentResponse: ResolverTypeWrapper<TentResponse>;
  Unit: Unit;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Group: Group;
  GroupeResponse: GroupeResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Tent: Tent;
  TentResponse: TentResponse;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tents?: Resolver<Array<ResolversTypes['Tent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupeResponse'] = ResolversParentTypes['GroupeResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createGroup?: Resolver<Maybe<ResolversTypes['GroupeResponse']>, ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'name'>>;
  createTent?: Resolver<Maybe<ResolversTypes['TentResponse']>, ParentType, ContextType, RequireFields<MutationCreateTentArgs, 'groupId' | 'identifyingNum' | 'size' | 'state'>>;
  deleteTent?: Resolver<Maybe<ResolversTypes['TentResponse']>, ParentType, ContextType, RequireFields<MutationDeleteTentArgs, 'id'>>;
  updateTent?: Resolver<Maybe<ResolversTypes['TentResponse']>, ParentType, ContextType, RequireFields<MutationUpdateTentArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allTentsFromGroup?: Resolver<Array<ResolversTypes['Tent']>, ParentType, ContextType, RequireFields<QueryAllTentsFromGroupArgs, 'id'>>;
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGroupArgs, 'id'>>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  tent?: Resolver<Maybe<ResolversTypes['Tent']>, ParentType, ContextType, RequireFields<QueryTentArgs, 'id'>>;
}>;

export type TentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tent'] = ResolversParentTypes['Tent']> = ResolversObject<{
  comments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  complete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  groupId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  identifyingNum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  integrated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['State'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['Unit'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TentResponse'] = ResolversParentTypes['TentResponse']> = ResolversObject<{
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tent?: Resolver<Maybe<ResolversTypes['Tent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Date?: GraphQLScalarType;
  Group?: GroupResolvers<ContextType>;
  GroupeResponse?: GroupeResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tent?: TentResolvers<ContextType>;
  TentResponse?: TentResponseResolvers<ContextType>;
}>;

