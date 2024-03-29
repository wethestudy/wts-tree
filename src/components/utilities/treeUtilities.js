import * as d3 from "d3";
import {links} from '../../links.js';
import { parameters } from "../../database/parameters.js";

export const treeUtilities = {
  treeProperties: parameters.treeProperties,
  processJSON: (data) => {
    let records = [];
    data.forEach(record => {
      let parentPlaceholder;
      try {
        parentPlaceholder = record.fields["Tree: Parent Post"][0];
      } catch {
        parentPlaceholder = "";
      }
      records.push({
        id: record.id,
        seoPostSummary: record.fields["SEO: Post Summary"],
        link: `${links["treeLink"]}/${record.fields["Slug"]}`,
        parentId: parentPlaceholder,
        category: record.fields["Organization: Category"],
        subcategory: record.fields["Organization: Subcategory"],
        topic: record.fields["Organization: Topic"],
        posttype: record.fields["Organization: Post Type"],
        siblingOrder: record.fields["Organization: Sibling Order"],
        premiumContent: record.fields["Article: Is Paid Content?"],
        revision: record.fields["Article: Revision"],
        connections: record.fields["Tree: Connections"],
        courseMapName: record.fields["Tree: Name"],
        name: record.fields["Name"],
      });
    });
    return records;
  },
  processRoot: (data, radius) => {
    const root = d3.stratify().id(d => d.id).parentId(d => d.parentId)(data);
    const tree = d3.tree;
    const separation = (a, b) => (a.parent === b.parent ? 1 : 2) / a.depth;
    tree().size([2 * Math.PI, radius]).separation(separation)(root);
    return root;
  },
  filterRecords: (data, filter) => {
    if (filter === "All") return data;
    let filteredData = data.filter(obj => {
      return obj.category === filter;
    });
    let rootData = data.filter(obj => {
      return obj.parentId === '';
    });
    return [...filteredData, ...rootData];
  },
  getTreeRadius: (category)=>{
    if (category === "All") { category = null; }
    switch (category) {
      case "Mathematics":
        return treeUtilities.treeProperties.mathRadiusFactor * treeUtilities.treeProperties.defaultTreeRadius;
      case "Physics":
        return treeUtilities.treeProperties.physicsRadiusFactor * treeUtilities.treeProperties.defaultTreeRadius;
      case "Engineering":
        return treeUtilities.treeProperties.engineeringRadiusFactor * treeUtilities.treeProperties.defaultTreeRadius;
      default:
        return treeUtilities.treeProperties.defaultTreeRadius;
    }
  },
  findNodeById: (root, id) => {
    if (root.id === id) {
      return root;
    }
    if (root.children) {
      for (const child of root.children) {
        const found = treeUtilities.findNodeById(child, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
};
