---
title: Types
---

<!-- markdownlint-disable MD036 -->

Types describe the data model of your API. You can use built-in types or create your own.

- Built-in types
  - [Primitives](#primitives)
  - [Containers](#containers)
- Create your own types
  - [Objects](#objects)
  - [Unions](#objects)
  - [Enums](#enums)
  - [Aliases](#aliases)

### Optional Types

Any type can be made optional by wrapping it in `optional<>`. For example:

```yaml
inTheaters: optional<boolean>`
```

## Built-in types

Fern includes two kinds of built-in types: **primitives** and **containers**.

### Primitives

The includes primitives are:

- `integer`
- `double`
- `long` _(range -2^53 to 2^53)_
- `string`
- `boolean`
- `datetime`
- `uuid`

### Containers

Containers wrap existing types. The included containers are

- `map<K, V>` - values of type `V` each indexed by a unique key of type `K` (keys are unordered).
- `list<V>` - an ordered sequence of items of type `T`.
- `set<V>`- a collection of distinct values of type `T`.
- `optional<V>` - represents a value of type `T` which is either present or not present.

```yml
types:
  KitchenSink:
    docs: Quite the kitchen sink!
    properties:
      someMap: map<string, boolean>
      myList: list<integer>
      maybeASet: optional<set<string>>
```

## Create your own types

### Objects

_Objects are a collection of named properties. A property can reference a built-in [primitive](#primitives) or a type you've defined._

```yaml
types:
  Movie:
    properties:
      id: MovieId
      title: string
      rating: double
      inTheaters: optional<boolean>
```

### Extending objects

It’s pretty common to have objects that might be more specific versions of other objects. For example, we might have an `Animal` object.

```yaml
types:
  Animal:
    properties:
      name: string
      color: string
```

We want to extend the `Animal` object to create a `Dog` object.

```yaml
types:
  Dog:
    extends: Animal
    properties:
      type:
        likesTreats: boolean
        furColor: optional<string>
```

### Unions

A union type represents a value that can have one of several different types.

```yaml
types:
  Shape:
    docs: |
      A shape is either a square or a circle.
      Don't ask about triangles.
    union:
      square: Square
      circle: Circle
  Square:
    properties:
      sideLength: double
  Circle:
    properties:
      radius: double
```

#### Using Discriminant

Union types in Fern are always discriminated. For example, the JSON representation of a `Square` is:

```json
{
  "type": "square",
  "sideLength": 42
}
```

By default, the `discriminant` in JSON will be `"type"`. You can change this by defining your own discriminant:

```diff
 types:
   Shape:
     docs: |
       A shape is either a square or a circle.
       Don't ask about triangles.
     union:
       square: Square
       circle: Circle
+    discriminant: shapeType
```

#### Using `void`

In union types, you can use `void` when a member has no additional data.

```yaml
types:
  TaskResult:
    union:
      success: void
      failure: FailureDetails
  FailureDetails:
    properties:
      reason: string
```

### Enums

An enum type represents a collection of allowed values.

```yaml
types:
  Suit:
    enum:
      - SPADES
      - HEARTS
      - CLUBS
      - DIAMONDS
```

You can optionally assign a `name` of an enum. This is often used when the `value` has punctuation. The `value` is what goes over the wire as JSON.

```yaml
GithubIssueStatus:
  enum:
    - name: IssueOpened
      value: issue.opened
    - name: IssueUpdated
      value: issue.updated
    - name: IssueClosed
      value: issue.closed
```

Let's look at another example.

```yaml
FamilyRelationship:
  docs: Describes the relationship between two individuals.
  enum:
    - name: SPOUSE
      value: "01"
      docs: 01 - Spouse
    - value: "02"
      name: SIBLING
      docs: 02 - Brother or Sister
```

### Aliases

An alias type renames an existing type. Use aliases to remove ambiguity and make types more self-documenting. For example, without aliases:

```yaml
types:
  Employee:
    id: string
    name: string
    # hmm, is this the manager's name or ID?
    manager: string
```

With aliases:

```diff
 types:
+  EmployeeId: string
   Employee:
+    id: EmployeeId
     name: string
+    manager: EmployeeId
```
